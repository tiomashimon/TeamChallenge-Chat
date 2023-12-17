import styles from './TitleForm.module.scss';

interface ITitleFormProps {
  titleName: string;
  subtitleName: string;
}

const TitleForm = ({ titleName, subtitleName }: ITitleFormProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{titleName}</h1>
      <p className={styles.subtitle}>{subtitleName}</p>
    </div>
  );
};

export default TitleForm;
