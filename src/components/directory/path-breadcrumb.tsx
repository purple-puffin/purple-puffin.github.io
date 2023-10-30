import { Fragment } from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { shallowEqual } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../../store';
import { goBackward } from '../../store/slices/directory';

const PathBreadcrumb = () => {
  const path = useAppSelector(s => s.directory.currentPath, shallowEqual);
  const dispatch = useAppDispatch();
  const dispatchGoBackward = (index: number) => dispatch(goBackward(index));

  return (
    <Breadcrumb>
      <Breadcrumb.Section content='/' onClick={() => dispatchGoBackward(0)} />
      <Breadcrumb.Divider icon='right angle' />
      {path.slice(0, -1).map((name, index) => <Fragment key={index}>
        <Breadcrumb.Section content={name} onClick={() => dispatchGoBackward(index + 1)} />
        <Breadcrumb.Divider icon='right angle' />
      </Fragment>)}
      <Breadcrumb.Section active content={path[path.length - 1]} />
    </Breadcrumb>
  );
};

export default PathBreadcrumb;
