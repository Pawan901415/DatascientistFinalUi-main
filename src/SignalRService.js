// signalrService.js
 
import { HubConnectionBuilder } from '@microsoft/signalr';
 
class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://csvbatchprocessing20231211145733.azurewebsites.net/progressHub') // Replace with your SignalR hub URL
      .withAutomaticReconnect()//
      .build();
 
    this.startConnection();//http://localhost:5147/progressHub
  }
 
  startConnection = async () => {
    try {
      await this.connection.start();
      console.log('SignalR Connected!');
    } catch (error) {
      console.error('Error starting SignalR connection:', error);
    }
  };
 
}
 
const signalRService = new SignalRService();
export default signalRService;