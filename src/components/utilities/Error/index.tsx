import ErrorIcon from "@/assets/icons/ErrorIcon";

export default function Error({ title }: { title: string }) {
  return (
    <div
      style={{
        //   backgroundColor: "red",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <ErrorIcon size={150} />
      </div>
      <h2
        style={{
          color: "rgba(0,0,0,1)",
          fontSize: "32px",
          fontWeight: "600",
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: " 20px",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        JobSearch has encountered an error. If this proplem persists, contact us
      </p>
    </div>
  );
}
