
import ScriptEditor from "../components/ScriptEditor/ScriptEditor";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Screenplay Editor</h1>
      </header>
      
      <main className="flex-1 p-4">
        <div className="max-w-5xl mx-auto pt-4">
          <ScriptEditor />
        </div>
      </main>
      
      <footer className="bg-slate-100 p-4 text-center text-sm text-slate-500">
        <p>Screenplay formatting with standard formatting rules</p>
      </footer>
    </div>
  );
};

export default Index;
