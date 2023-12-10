import styles from './Contact.module.css';

const Contact = () => {
  return (
    <article className={styles.contact}>
      <div className={styles.contact_photo}>
      </div>

      <div className={styles.contact_info}>
        <div className={styles.contact_name}>Name</div>

        <div className={styles.contact_message}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita pariatur omnis doloremque, quae magnam in excepturi fugit corporis magni quisquam, aliquid labore voluptatem, est veniam aspernatur ducimus? Dolorem, beatae consectetur!</div>
      </div>
    </article>
  );
};

export default Contact;
