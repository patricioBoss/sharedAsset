import { Container } from '@mui/material';
// layouts
import Layout from '../../adminLayout/admin/adminLayout';
// hooks
// import { useTheme } from '@mui/material/styles';
import serializeFields from '../../helpers/serialize';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import MailCompose from '../../components/mailCompose';
// sections

// import PropTypes from 'prop-types';
// import User from '../../models/user.model';
// import AdminUserListtable from '../../components/adminUserListTable';
// import dbConnect from '../../utils/dbConnect';

// ----------------------------------------------------------------------

Mail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
// export const getServerSideProps = async () => {
//   await dbConnect();
//   const userList = serializeFields(await User.find({}).lean(true));

//   return {
//     props: {
//       userList,
//     },
//   };
// };

export default function Mail() {
  //   const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="send mail">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <MailCompose />
      </Container>
    </Page>
  );
}
