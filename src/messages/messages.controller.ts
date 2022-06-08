import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  async listMessages() {
    const messages = await this.messageService.findAll();
    if (!messages) {
      return new NotFoundException('No message found');
    }

    return messages;
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messageService.findOne(id);
    if (!message) {
      return new NotFoundException('Message not found');
    }

    return message;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messageService.createMessage(body.content);
  }
}
