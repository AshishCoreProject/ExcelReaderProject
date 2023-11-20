import { table } from "table";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { styled } from "styled-components";

const ContentStyle = styled.div`
  display: flex;
  min-height: 900px;
  padding-top: 10px;
  background-color: #fbffdc;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  font-family: Montserrat;
`;

function App() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const [tableFormat, setTableFormat] = useState([]);
  const [receivedData, setReceivedData] = useState(false);
  const fileReader = new FileReader();

  let tableArray;

  function handleOnSubmit(e) {
    e.preventDefault();

    function csvFileToArray(string) {
      const arrayHeader = string.slice(0, string.indexOf("\n")).split(",");
      const stringRows = string.slice(string.indexOf("\n") + 1);

      tableArray = stringRows.split("\n").map((row) => row.split(","));
      tableArray.pop();
      tableArray.unshift(arrayHeader);

      setReceivedData(true);
      setTableFormat(table(tableArray));
    }

    if (file) {
      fileReader.onload = function (event) {
        const string = event.target.result;
        console.log(string);
        csvFileToArray(string);
      };

      fileReader.readAsText(file);
    }
  }

  function handleOnChange(e) {
    e.preventDefault();
    setFile(e.target.files[0]);

    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  }

  return (
    <ContentStyle>
      <Box>
        <form>
          <h3>{fileName}</h3>
          <input
            type={"file"}
            id={"csvFileInput"}
            accept={".csv, .ods"}
            onChange={handleOnChange}
          />
          <Button
            onClick={(e) => {
              handleOnSubmit(e);
            }}
            variant="outlined"
            type="submit"
          >
            {!fileName ? "Upload" : fileName ? "Next" : "Upload"}
          </Button>
        </form>

        <div>{receivedData && <pre>{tableFormat}</pre>} </div>
      </Box>
    </ContentStyle>
  );
}

export default App;
