import { Text } from '@/components/ui/Text';
import { Textarea } from '@/components/ui/TextArea';

const CommentSection = ({ value, onChange }) => {
  return (
    <div
      className={
        'flex flex-col p-2 pb-4 gap-2 bg-primary border-b border-brand'
      }
    >
      <Text variant='productName' color='primary'>
        Notas para la cocina
      </Text>
      <Textarea
        className='resize-none'
        onChange={onChange}
        value={value}
        name='comment'
        placeholder='Ej: Sin mostaza, sin cebolla...'
      />
    </div>
  );
};

export default CommentSection;
