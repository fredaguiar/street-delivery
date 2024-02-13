import { Text } from '@rneui/themed';

const CustomerCard = ({ key, email, name }: { key: string; email: string; name: string }) => {
  return (
    <Text>
      {key} {email} {email}
    </Text>
  );
};

export default CustomerCard;
