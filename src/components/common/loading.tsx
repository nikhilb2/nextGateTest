import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);


interface Props {
    className?: string
}
export default function LinearIndeterminate(props: Props) {
  const classes = useStyles();
    const { className } = props
  return (
    <div className={`${classes.root} ${className}`}>
      <LinearProgress color="primary"  />
    </div>
  );
}