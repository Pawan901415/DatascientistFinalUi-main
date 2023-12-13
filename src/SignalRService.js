import { HubConnectionBuilder } from '@microsoft/signalr';
 
class SignalRService {
  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('https://csvbatchprocessing20231213121617.azurewebsites.net/progressHub') // Replace with your SignalR hub URL
      .withAutomaticReconnect()//
      .build();
 
     
 
    this.startConnection();//http://localhost:5040/progressHub
 
   
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
 