import InfoChat from "../components/InfoChat";
import InfoSubasta from "../components/InfoSubasta";

function Chat() {
  return (
    <div className="grid grid-cols-2 p-8">
      <InfoChat />
      <InfoSubasta />
      <div className="bg-orange-400">
        <h2>Hola</h2>
      </div>
    </div>
  );
}

export default Chat;
