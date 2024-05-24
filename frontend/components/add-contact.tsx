import {useState} from "react";
import styles from "../styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";

export default function AddContact()
{
    const [addContact,setAddContact]=useState(false);
    const [name,setName]=useState("");
    const [age,setAge]=useState("");
    const [healthIssues,sethealthIssues]=useState("");
    const [prescribedMedicines,setprescribedMedicines]=useState("");
    const [address,setAddress]=useState("");

    function resetForm(){
        setName("");
        setAddress("");
        sethealthIssues("");
        setName("");
        setprescribedMedicines("");
        setAddress("");
    }
    return (
        <div>
            {!addContact ? (
                <button className={styles.addContactTriggerButton}
                onClick={()=>setAddContact(true)}
                >Add Record</button>
            ) : (
                <div className={styles.addContactContainer}>
                    <div className={styles.addContactCard}>
                        <button className={styles.closeButton} onClick={()=>setAddContact(false)}>Close</button>
                        <div className={styles.addContactForm}>
                            <h3>Add Record:</h3>
                            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                            <input type="text" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
                            <input type="text" placeholder="Health Issues" value={healthIssues} onChange={(e)=>sethealthIssues(e.target.value)}/>
                            <input type="text" placeholder="Prescribed Medicines" value={prescribedMedicines} onChange={(e)=>setprescribedMedicines(e.target.value)}/>
                            <input type="text" placeholder="0x0000" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        </div>
                        <Web3Button
                            contractAddress={CONTRACT_ADDRESS}
                            action={(contract)=>contract.call(
                                "addContact",
                                [name,age,healthIssues,prescribedMedicines,address]
                            )} onSuccess={()=>{
                                resetForm();
                                setAddContact(false);
                            }}
                        >Add Record</Web3Button></div>
                    </div>
                
            )}
        </div>
    )
}
