import ReactLoading from 'react-loading';

type Props = {
  width: string;
  height: string;
  size?: string;
};

export const LoadingSpin = ({ width, height, size="60px" }: Props) => {
  return (
    <div style={{
      width,
      height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <ReactLoading
        type="spin"
        color="#ccc"
        width={size}
        height={size}
      />
    </div>
  );
};
