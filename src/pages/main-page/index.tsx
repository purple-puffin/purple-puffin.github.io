import useWindowSize from '../../hooks/use-window-size';
import Directory from '../../components/directory';
import InvoiceForm from '../../components/invoice-form';

const MainPage = () => {
  const { height } = useWindowSize();
  const childrenHeight = height - 40;

  return (
    <>
      <Directory height={childrenHeight * 0.45} />
      <InvoiceForm height={childrenHeight * 0.55} />
    </>
  );
}

export default MainPage;
