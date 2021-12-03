import "./GeneralSet.css";
import InputTag from "../InputTag";

export default function GeneralSet({ User }) {
  return (
    <>
      <h1 className="fs-4 text-secondary pb-3">General Setting:</h1>
      <InputTag
        id={"name"}
        label={"Full name"}
        type={"text"}
        placeholder={"name .."}
      />
      <InputTag
        id={"userName"}
        label={"Username"}
        type={"text"}
        placeholder={"username .."}
      />
      <InputTag
        id={"userEmail"}
        label={"Email"}
        type={"email"}
        placeholder={"example@mail.com"}
      />
      <InputTag
        id={"password"}
        label={"Password"}
        type={"password"}
        placeholder={""}
      />
      {User && (
        <InputTag
          id={"newpassword"}
          label={"New Password"}
          type={"password"}
          placeholder={""}
        />
      )}
      <InputTag
        id={"repeatPass"}
        label={"Repeat Password"}
        type={"pass"}
        placeholder={""}
      />
    </>
  );
}
