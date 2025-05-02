'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"

const GenerateProgram = () => {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const originalError = console.error;
    // override console.error to ignore "Meeting has ended" errors
    console.error = function (msg, ...args) {
      if (
        msg &&
        (msg.includes("Meeting has ended") ||
          (args[0] && args[0].toString().includes("Meeting has ended")))
      ) {
        console.log("Ignoring known error: Meeting has ended");
        return; // don't pass to original handler
      }

      // pass all other errors to the original handler
      return originalError.call(console, msg, ...args);
    };

    // restore original handler on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile")
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded, router]);

  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    }

    const handleCallEnd = () => {
      setConnecting(false);
      setCallActive(false);
      setIsSpeaking(false);
      setCallEnded(true);
    }

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role }
        setMessages(prev => [...prev, newMessage])
      }
    }

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    }

    vapi.on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError)

    return () => {
      vapi.off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError)
    }
  }, []);

  const toggleCall = async () => {
    if (callActive) return vapi.stop();
    try {
      setConnecting(true);
      setMessages([]);
      setCallEnded(false);

      const fullName = user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "There";

      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          full_name: fullName,
          user_id: user?.id,
        }
      });
    } catch (error) {
      console.log("Failed to start call", error);
      setConnecting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-6 text-foreground bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-mono text-primary mb-2">Generate Your Fitness Program</h1>
          <p className="text-muted-foreground">Have a voice conversation with our AI assistant to create your personalized plan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-card/90 border border-border backdrop-blur-sm">
            <div className="aspect-video flex flex-col justify-center items-center p-6 relative">
              <div className={`absolute inset-0 transition-opacity duration-300 ${isSpeaking ? "opacity-30" : "opacity-0"}`}>
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`mx-1 w-1 bg-primary rounded-full ${isSpeaking ? "animate-sound-wave" : ""}`}
                      style={{ animationDelay: `${i * 0.1}s`, height: isSpeaking ? `${Math.random() * 50 + 20}%` : "5%" }}
                    />
                  ))}
                </div>
              </div>

              <div className="relative size-32 mb-4">
                <div className={`absolute inset-0 bg-primary opacity-10 rounded-full blur-lg ${isSpeaking ? "animate-pulse" : ""}`} />
                <div className="relative w-full h-full border border-border rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-secondary/10" />
                  <img src="/ai-avatar_.png" alt="AI Assistant" className="w-full h-full object-cover" />
                </div>
              </div>

              <h2 className="text-xl font-semibold text-foreground">FlexForge AI</h2>
              <p className="text-sm text-muted-foreground">Fitness & Diet Coach</p>

              <div className={`mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-card border ${isSpeaking ? "border-primary" : ""}`}>
                <div className={`w-2 h-2 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-muted"}`} />
                <span className="text-xs text-muted-foreground">
                  {isSpeaking ? "Speaking..." : callActive ? "Listening..." : callEnded ? "Redirecting..." : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-card/90 border border-border backdrop-blur-sm">
            <div className="aspect-video flex flex-col items-center justify-center p-6">
              <div className="relative size-32 mb-4">
                <img src={user?.imageUrl} alt="User" className="rounded-full object-cover size-full" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">You</h2>
              <p className="text-sm text-muted-foreground">{user ? `${user.firstName} ${user.lastName || ""}`.trim() : "Guest"}</p>
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full border bg-card">
                <div className="w-2 h-2 rounded-full bg-muted" />
                <span className="text-xs text-muted-foreground">Ready</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Message Container*/}
        {messages.length > 0 && (
          <div ref={messageContainerRef} className="w-full h-64 overflow-y-auto rounded-xl border border-border p-4 bg-card/90 backdrop-blur-sm mb-8">
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className="animate-fadeIn">
                  <div className="text-xs text-muted-foreground font-semibold mb-1">
                    {msg.role === "assistant" ? "FlexForge AI" : "You"}:
                  </div>
                  <p className="text-foreground">{msg.content}</p>
                </div>
              ))}
              {callEnded && (
                <div className="animate-fadeIn">
                  <div className="text-xs text-primary font-semibold mb-1">System:</div>
                  <p className="text-foreground">Your fitness program has been created! Redirecting to your profile...</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="w-full flex justify-center">
          <Button
            className={`w-40 text-xl rounded-3xl text-white relative ${callActive ? "bg-destructive hover:bg-destructive/90" : callEnded ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"}`}
            onClick={toggleCall}
            disabled={connecting || callEnded}
          >
            {connecting && <span className="absolute inset-0 animate-ping bg-primary/50 opacity-75 rounded-full" />}
            <span>{callActive ? "End Call" : connecting ? "Connecting..." : callEnded ? "View Profile" : "Start Call"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GenerateProgram;