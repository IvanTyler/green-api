import { clsx } from 'clsx';
import type { MessageDirection } from '../../../../api/types/types';
import style from './MessageBubble.module.scss';

interface IMessageBubbleProps {
  direction: MessageDirection;
  text: string;
}

export const MessageBubble = ({ direction, text }: IMessageBubbleProps) => {
  return (
    <div
      className={clsx(
        style.messageBubble,
        direction === 'in' && style.messageBubble_in,
        direction === 'out' && style.messageBubble_out
      )}
    >
      <span className={style.messageBubble__text}>{text}</span>
    </div>
  );
};
