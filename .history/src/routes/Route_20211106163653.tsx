import React from 'react';
import {
  RouteProps as ReactDomRouteProps,
  Redirect,
  Route as ReactDomRoute,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

interface RoutesProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RoutesProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/app/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;