import { Container } from '@mui/material';
// layouts
import Layout from '../../adminLayout/admin/adminLayout';
// hooks
import { useTheme } from '@mui/material/styles';
import serializeFields from '../../helpers/serialize';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import PropTypes from 'prop-types';
import Investment from '../../models/investment.model';
import AdminInvestmentListtable from '../../components/adminInvestmentTable';
import dbConnect from '../../utils/dbConnect';

// ----------------------------------------------------------------------

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
export const getServerSideProps = async ({ req }) => {
  await dbConnect();
  const invtList = serializeFields(
    await Investment.find({}).populate({ path: 'userId', select: 'email _id' }).lean(true)
  );
  console.log('this is all investments', invtList);
  return {
    props: {
      invtList,
    },
  };
};
Home.propTypes = {
  invtList: PropTypes.array,
};

export default function Home({ invtList }) {
  console.log(invtList);
  //   const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="adminUser">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <AdminInvestmentListtable rows={invtList} />
      </Container>
    </Page>
  );
}
