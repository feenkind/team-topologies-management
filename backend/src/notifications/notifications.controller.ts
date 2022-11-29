import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '@nestjs/passport';
import { interval, map, Observable, switchMap } from 'rxjs';
import { NotificationDto } from './dto/notification.dto';

@Controller('notifications')
export class NotificationsController {
  private sseToken = 'eUyke98qYI8oZNbihzliRy4tI93fEaEk';
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(AuthGuard('basic'))
  @Get()
  findAll(): Promise<NotificationDto[]> {
    return this.notificationsService.findAll();
  }

  @UseGuards(AuthGuard('basic'))
  @Patch(':id/read')
  setRead(@Param('id') id: string): Promise<NotificationDto> {
    return this.notificationsService.markRead(id);
  }

  @UseGuards(AuthGuard('basic'))
  @Get('token')
  getToken(): string {
    // this will need to be replaced with a real token, for the prototype a
    // fixed string is sufficient though
    return this.sseToken;
  }

  @Sse('sse')
  sse(@Query() query: { token: string }): Observable<MessageEvent> {
    if (!query.token || query.token !== this.sseToken) {
      return;
    }
    // trigger notifications every minute
    return interval(60000).pipe(
      switchMap(() => this.notificationsService.triggerNotifications()),
      map(
        (notifications) =>
          ({
            data: notifications,
          } as MessageEvent),
      ),
    );
  }
}
