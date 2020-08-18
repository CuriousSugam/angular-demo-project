import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent {
  serverID: number = 10;
  serverName: string = 'ec2-123';
  serverStatus: string = 'online';

  constructor(private router: Router) {}

  getServerName() {
    return this.serverName;
  }

  getServerStatus() {
    return this.serverStatus;
  }

  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: 1 },
      fragment: `server-${id}`,
    });
  }
}
