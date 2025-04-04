import AudioMessages from "@/components/AudioMessages";
import AudioMessageForm from "@/components/AudioMessageForm";

export default function AudioMessagesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Mensajes de Audio</h1>

      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <AudioMessageForm />
        </div>

        <div className="md:col-span-7">
          <AudioMessages />
        </div>
      </div>
    </div>
  );
}
