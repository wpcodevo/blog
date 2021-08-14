import Image from "next/image";
import { format, parseISO } from "date-fns";

export function Comments({ comments }) {
  return (
    <div className='comments'>
      <h4 className='mt-10 mb-4 d-flex'>
        {comments.length} COMMENTS
        {"  "}
      </h4>
      {comments.length === 0 && (
        <p
          style={{
            borderBottom: "1px solid #ddd",
            margin: "50px 0 50px",
            paddingBottom: 50,
          }}
        >
          Congratulations, you have the opportunity to be the first commenter on
          this article. Have a question or suggestion? Please leave a comment to
          start the discussion.
        </p>
      )}

      <div>
        {comments.map(({ _id, _createdAt, name, email, comment }) => (
          <div key={_id} className='mb-4 comment'>
            <div className='d-flex'>
              <div style={{ marginRight: "20px" }}>
                <Image
                  width='60'
                  height='60'
                  alt='avator'
                  src='/images/avator.png'
                />
              </div>
              <div>
                <a
                  style={{ display: "block", fontSize: 19 }}
                  href={`mailto:${email}`}
                >
                  {name}
                </a>

                <span
                  style={{ fontSize: 13, color: "#ff6200", fontWeight: 500 }}
                >
                  {format(parseISO(_createdAt), "PPP")}
                </span>
              </div>
            </div>
            <p
              style={{
                padding: "10px 20px 45px",
                margin: "25px 0 0",
                fontSize: 15,
                border: "1px solid #dfdfdf",
                borderRadius: 3,
              }}
            >
              {comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
