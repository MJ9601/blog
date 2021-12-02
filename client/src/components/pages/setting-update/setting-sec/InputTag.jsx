import "./InputTag.css";

export default function InputTag({ id, label, type, placeholder }) {
  return (
    <div className="general-set-wrapper">
      <label htmlFor={id}>{label}: </label>
      <input type={type} id={id} className="w-100" placeholder={placeholder} />
    </div>
  );
}
