import { ThreeDots } from 'react-loader-spinner';

export default function Loading() {
  return (
    <ThreeDots
      height="50"
      width="50"
      radius="5"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        marginTop: '200px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        marginLeft: '-24px',
      }}
      wrapperClassName=""
      visible={true}
    />
  );
}
