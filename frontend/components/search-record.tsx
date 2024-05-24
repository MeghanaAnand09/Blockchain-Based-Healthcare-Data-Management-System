import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Web3Button } from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import ContactCard from "./contact-card";
import PatientRecord from "./patient-record";

interface PatientRecord {
  name: string;
  age: number;
  healthIssues: string;
  prescribedMedicines: string;
  wallet: string;
}

export default function SearchRecord() {
  const [searchRecord, setSearchRecord] = useState(false);
  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [patientRecord, setPatientRecord] = useState<PatientRecord | null>(null);

  const { contract } = useContract(CONTRACT_ADDRESS);

  function resetForm() {
    setIndex("");
    setName("");
    setAge("");
    setPatientRecord(null);
  }

  async function handleSearch() {
    try {
      if (!contract) {
        console.error("Contract not available");
        return;
      }


      const record = await contract.call("getPatientContact", [name, age]);


      if (!record) {
        console.error("Record not found");
        return;
      }

      setPatientRecord({
        name: record.name,
        age: record.age,
        healthIssues: record.healthIssues,
        prescribedMedicines: record.prescribedMedicines,
        wallet: record.wallet,
      });
    } catch (error) {
      console.error("Error fetching patient record:", error);

    }
  }

  return (
    <div>
      {!searchRecord ? (
        <button
          className={styles.searchRecordTriggerButton}
          onClick={() => setSearchRecord(true)}
        >
          Search Record
        </button>
      ) : (
        <div className={styles.searchRecordContainer}>
          <div className={styles.searchRecordCard}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setSearchRecord(false);
                resetForm();
              }}
            >
              Close
            </button>
            <div className={styles.searchRecordForm}>
              <h4>Search Record:</h4>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={() => handleSearch()}
              onSuccess={() => setSearchRecord(false)}
            >
              Search
            </Web3Button>
          </div>
        </div>
      )}

      {patientRecord && (
        <div className={styles.fetchedRecordContainer}>
          <h3>Fetched Record:</h3>
          <PatientRecord
            name={patientRecord.name}
            age={patientRecord.age}
            healthIssues={patientRecord.healthIssues}
            prescribedMedicines={patientRecord.prescribedMedicines}
            wallet={patientRecord.wallet}
          />
        </div>
      )}
    </div>
  );
}
