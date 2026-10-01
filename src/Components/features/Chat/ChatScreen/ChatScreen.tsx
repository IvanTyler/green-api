import { Input } from '../../../UI/Input/Input';
import { Button } from '../../../UI/Button/Button';
import { MessageBubble } from '../MessageBubble/MessageBubble';
import type { MessageDirection } from '../../../../api/types/types';
import style from './ChatScreen.module.scss';

interface IMockMessage {
  id: string;
  direction: MessageDirection;
  text: string;
}

// Заглушка для верстки — реальные сообщения появятся, когда подключим
// SendMessage и опрос ReceiveNotification.
const MOCK_MESSAGES: IMockMessage[] = [
  { id: '1', direction: 'in', text: 'Привет! Это тестовый чат GREEN-API.' },
  { id: '2', direction: 'out', text: 'Привет! Проверяю, как выглядит переписка.' },
  { id: '3', direction: 'in', text: 'Выглядит неплохо.' },
];

export const ChatScreen = () => {
  return (
    <div className={style.chatScreen}>
      <header className={style.chatScreen__header}>
        <span className={style.chatScreen__title}>Новый чат</span>
      </header>

      <div className={style.chatScreen__messages}>
        {MOCK_MESSAGES.map((message) => (
          <MessageBubble key={message.id} direction={message.direction} text={message.text} />
        ))}
      </div>

      <form className={style.chatScreen__composer}>
        <Input placeholder="Сообщение" className={style.chatScreen__input} />
        <Button type="submit" label="Отправить" />
      </form>
    </div>
  );
};
