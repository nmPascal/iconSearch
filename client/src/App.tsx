import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import "./App.css";
import { loadAllRecords } from "./fetchData";
import { allRecordsAtom, myRecordsAtom } from "./atoms";
import Layout from "./components/Layout/Layout";
import NavBar from "./components/NavBar/NavBar";
import IconList from "./components/IconList/IconList";
import Download from "./components/Download/Download";

function App() {
  const [all, setAllRecords] = useAtom(allRecordsAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [myRecords] = useAtom(myRecordsAtom);

  useEffect(() => {
    (async () => {
      const { data, error } = await loadAllRecords();
      if (error) console.log(error);

      data &&
        setAllRecords(
          data.map((icon) => ({
            ...icon,
            filePath: `/images/icons${icon.filePath}`,
          }))
        );
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="App">
      <Layout>
        <NavBar />
        {isLoading ? (
          <div className="loader">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <>
            <IconList />
            {myRecords?.length ? <Download /> : null}
          </>
        )}
      </Layout>
    </div>
  );
}

export default App;
