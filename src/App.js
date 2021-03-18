import "./App.css";
import SingleResume from "./SingleResume";
import initialData from "./data"
function App() {
  const [resume, setResume] = useState(initialData.record);

  return (
    <div className="App">
    {resume.map( (resume)=><SingleResume reusme={resume} />) }
    </div>
  );
}

export default App;
