import { Alert } from "react-bootstrap";

export const PreviewAlert = () => {
  return (
    <Alert variant='secondary'>
      You are in preview mode{" "}
      <Alert.Link href='/api/exit-preview' aria-label='preview'>
        leave preview mode
      </Alert.Link>
    </Alert>
  );
};
