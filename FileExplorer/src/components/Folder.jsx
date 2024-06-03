import { useState } from "react";
import "./styles.css";
/*--------------------------------------------------------------------------------------------
export default function Folder({ explorer }) {
  console.log(explorer);
  if (explorer.isFolder) {
    const[expand,setExpand] = useState(false);
     
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={()=>setExpand(!expand)}>
          <span>📁{explorer.name}</span>
        </div>
        <div style={{display:expand? "block":"none",paddingLeft:25}}>

          {explorer.items.map((exp) => {
            return (
              <Folder explorer={exp} key={exp.id} />
            )
          })}

        </div>
      </div>
    );
  } else {
    return ( 
      <span className="file">📄{explorer.name}</span>
    );
  }
}
------------------------------------------------------------------------------------------------*/

export default function Folder({ handleInsertNode, explorer }) {
  console.log(explorer);
  if (explorer.isFolder) {
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
      visible: false,
      isFolder: null,
    });
    const handleNewFolder = (e, isFolder) => {
      e.stopPropagation();
      setExpand(true);
      setShowInput({ visible: true, isFolder });
    };
    const onAddFolder = (e) => {
      if (e.keyCode === 13 && e.target.value) {
        handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
        setShowInput({ ...showInput, visible: false });
      }
    };
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁{explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)} className="btn">
              Folder +
            </button>
            <button onClick={(e) => handleNewFolder(e, false)} className="btn">
              File +
            </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                onKeyUp={onAddFolder}
                type="text"
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                className="inputContainer__input"
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄{explorer.name}</span>;
  }
}
