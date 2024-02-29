import { useState } from 'react';
import { Grid,  Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  onSubmit: Function;
  children?: React.ReactNode;
  submitText?: string;
};

export const CustomForm = ({ onSubmit, children, submitText = "保存" }: Props) => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | undefined>();

  const action = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    try {
      await onSubmit();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={action}
    >
      {children}
      {error && (
        <Grid style={{ marginBottom: "32px"}}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}
      <Grid item>
        <LoadingButton
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          loading={loading}
        >
          {submitText}
        </LoadingButton>
      </Grid>
    </form>
  );
};
