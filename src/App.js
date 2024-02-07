import React, { useState } from 'react';
import { BleClient, numberToUUID } from '@capacitor-community/bluetooth-le';

function BluetoothScanner() {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);

  const startScan = async () => {
    try {
      setScanning(true);
      setDevices([]); // Clear previous scan results

      // Initialize the BLE client
      await BleClient.initialize();

      // Start scanning for BLE devices
      await BleClient.requestLEScan(
        {},
        (result) => {
          console.log('received new scan result', result);
          setDevices((prevDevices) => [...prevDevices, result]);
        }
      );

      // Stop scanning after 5 seconds
      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
        setScanning(false);
      }, 5000);
    } catch (error) {
      console.error('Error during BLE scan:', error);
      setScanning(false);
    }
  };

  return (
    <div>
      <h1>Bluetooth LE Scanner</h1>
      <button onClick={startScan} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Start Scan'}
      </button>

      <h2>Scan Results:</h2>
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            Name: {device.name}, UUID: {device.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BluetoothScanner;
