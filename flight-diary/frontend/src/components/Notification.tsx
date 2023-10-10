interface NotificationProps {
  notification: string;
}
const Notification = ({ notification }: NotificationProps) => {
  const style = {
    color: "red",
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
