import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { NavLink, NavLinkProps } from 'react-router-dom';

type NavButtonProps = ButtonProps & NavLinkProps;

const NavButton = (props: NavButtonProps) => {
  const { children, to, onClick, ...rest } = props;

  return (
    <NavLink {...rest} to={to} style={() => ({ textDecoration: 'none' })}>
      {({ isActive }) => (
        <Button
          {...rest}
          colorPalette={isActive ? 'blue' : undefined}
          variant={isActive ? 'solid' : 'surface'}
          justifyContent='flex-start'
          w='100%'
          onClick={onClick}
        >
          {children}
        </Button>
      )}
    </NavLink>
  );
};

export { NavButton };
