import { useState } from 'react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { NextPage } from 'next';
import AddContact from '../components/add-contact';
import ContactList from '../components/contact-list';
import SearchRecord from '../components/search-record'; 

enum Role {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

const ChooseRole: React.FC<{ onRoleSelect: (role: Role) => void }> = ({ onRoleSelect }) => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Patient Health Record System</h1>
      <button style={{ padding: '0.5rem', borderRadius: '5px', backgroundColor: '#fff', color: '#000', border: 'none', marginRight: '1rem', cursor: 'pointer' }} onClick={() => onRoleSelect(Role.DOCTOR)}>Doctor</button><br />
      <button style={{ padding: '0.5rem', borderRadius: '5px', backgroundColor: '#fff', color: '#000', border: 'none', marginRight: '1rem',cursor: 'pointer' }} onClick={() => onRoleSelect(Role.PATIENT)}>Patient</button>
    </div>
  );
};

const Home: NextPage = () => {
  const [role, setRole] = useState<Role | null>(null); 
  const [showContent, setShowContent] = useState(false); 
  const address = useAddress();

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole); 
    setShowContent(true); 
  };

  
  const canAccessDoctorDashboard = role === Role.DOCTOR;
  const canAccessPatientDashboard = role === Role.PATIENT;

  return (
    <div className={styles.container}>
      
      {!role && <ChooseRole onRoleSelect={handleRoleSelect} />}
      
      
      {canAccessDoctorDashboard && showContent && (
        <div className={styles.addressContainer}>
          <div className={styles.addressHeader}>
            <h1>Doctor Dashboard</h1>
            <ConnectWallet />
          </div>
          {address && (
            <div className={styles.addressListContainer}>
              <h3>Records:</h3>
              <AddContact />
              <ContactList />
            </div>
          )}
        </div>
      )}

      
      {canAccessPatientDashboard && showContent && (
        <div className={styles.addressContainer}>
          <div className={styles.addressHeader}>
            <h1>Patient Dashboard</h1>
            <ConnectWallet />
          </div>
          {address && (
            <div className={styles.addressListContainer}>
              <h3>Records:</h3>
              <SearchRecord /> 
            </div>
          )}
        </div>
      )}

      
      {!canAccessDoctorDashboard && !canAccessPatientDashboard && (
        <div>
          <h1>Unauthorized Access</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
