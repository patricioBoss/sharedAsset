import PropTypes from 'prop-types';
// components
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly']),
  user: PropTypes.object,
};

export default function Layout({ variant = 'dashboard', user, children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  return <DashboardLayout user={user}> {children} </DashboardLayout>;
}
