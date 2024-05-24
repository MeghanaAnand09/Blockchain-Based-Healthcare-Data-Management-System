import { Web3Button } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css'
import { CONTRACT_ADDRESS } from "../const/addresses"

type Props ={
    index?:number;
    name:string;
    age:number;
    healthIssues:string;
    prescribedMedicines:string;
    wallet:string;
};

export default function PatientRecord({index,name,age,healthIssues,prescribedMedicines,wallet}:Props)
{
    return (
        <div className={styles.patientCardContainer}>
            <div className={styles.patientCardInfo}>
                <h2>{name}</h2>
                <h3>{index}</h3>
                <p>Age:</p>
                <h3 style={{ fontSize: 'smaller' }}>{age.toString()}</h3>
                <p >Health Issues:</p>
                <h3 style={{ fontSize: 'smaller' }}>{healthIssues}</h3>
                <p >Prescribed Medicines:</p>
                <h3 style={{ fontSize: 'smaller' }}>{prescribedMedicines}</h3>
                <p >Wallet Address:</p>
                <h3 style={{ fontSize: 'smaller' }}>{wallet}</h3>
            </div>
        </div>
    )
}
