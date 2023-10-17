import React, {Fragment,  useEffect, useState} from "react"
// import script from "../python/password_generate.py"

export default function Home(){

    const pyScript = async () => {
        const pyodide  = await window.loadPyodide({
            indexURL : "https://cdn.jsdelivr.net/pyodide/v0.18.1/full/"
        })
        return await pyodide.runPythonAsync(`
            import secrets
            import string
            import js
            import pyodide

            def generator():

                # defining required string
                letters = string.ascii_letters
                digits = string.digits
                special_characters = string.punctuation

                # combining into alphabet
                alphabet = letters + digits + special_characters
                password = ''
                
                
                for i in range(16):
                    password += ''.join(secrets.choice(alphabet))
                
                    if(any(char in special_characters for char in password) and sum(char in digits for char in password)>=8):
                        break
                                

                return password

            generator()`);
    }
    const [output, setOutput] = useState("(error loading...)");
    

    useEffect(() => {
        const run = async () => {
        const scriptText = await (await fetch(pyScript)).text();
        const out = await pyScript(scriptText);
        setOutput(out);
        }
        run();
    
    }, []);


    return(
        <Fragment>
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center" style={{height: "800px"}}>
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h1 className="card-title">Random Password Generator</h1>
                            <p className="card-text">Press password generator button to create a random password</p>
                            
                            <button type="button" onClick={pyScript} className="btn btn-info" data-bs-toggle="modal" data-bs-target="#passwordModal">
                            Generate
                            </button>

                        {/* <!-- Modal --> */}
                            <div className="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
                                <div className="modal-dialog" style={{position: "absolute", left: "50%" ,top: "50%", transform: "translate(-50%, -50%)"}}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="passwordModalLabel">Your random password is:</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body mx-2">
                                            <i>{output}</i>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-warning" onClick={() => window.location.reload(false)}>Generate a new Password</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
            
    </Fragment>
    )
}