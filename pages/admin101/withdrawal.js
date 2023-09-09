import { Container } from '@mui/material';
// layouts
import Layout from '../../adminLayout/admin/adminLayout';
// hooks
import serializeFields from '../../helpers/serialize';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import PropTypes from 'prop-types';
import Withdrawal from '../../models/withdrawal.model';
import AdminWithdrawalTable from '../../components/adminWithdrawalTable';
import dbConnect from '../../utils/dbConnect';

// ----------------------------------------------------------------------

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export const getServerSideProps = async ({ req }) => {
  await dbConnect();
  const withdrawalList = serializeFields(
    await Withdrawal.find({}).populate({ path: 'userId', select: 'email _id' }).lean(true)
  );
  console.log('this is all withdrawals', withdrawalList);
  return {
    props: {
      withdrawalList,
    },
  };
};
Home.propTypes = {
  withdrawalList: PropTypes.array,
};

export default function Home({ withdrawalList }) {
  console.log(withdrawalList);
  //   const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="adminUser">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <AdminWithdrawalTable rows={withdrawalList} />
      </Container>
    </Page>
  );
}
