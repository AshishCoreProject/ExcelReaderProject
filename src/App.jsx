// import * as XLSX from "xlsx";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { styled } from "styled-components";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const ContentStyle = styled.div`
  display: flex;
  height: 800px;
  padding-top: 10px;
  background-color: #fbffdc;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  font-family: Montserrat;
`;

function App() {
  // const [isClick, setIsClick] = useState(false);
  // const workbook = XLSX.readFile(fileName);
  const [fileName, setFileName] = useState("");
  const fileReader = new FileReader();

  function handleOnSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (fileName) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        return csvOutput;
      };

      fileReader.readAsText(fileName);
    }
  }

  function handleFile(e) {
    e.preventDefault();
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
            type="file"
            id="input_dom_element"
            onChange={handleFile}
            accept=".ods, .xlsx, .csv"
          />
          <Button onClick={handleOnSubmit} variant="outlined" type="submit">
            {!fileName ? "Upload" : fileName ? "Next" : "Upload"}
          </Button>
        </form>
      </Box>
    </ContentStyle>
  );
}

export default App;
