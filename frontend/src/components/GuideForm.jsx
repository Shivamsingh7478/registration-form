export const GuideRegistration = () => {
    return (
     <div className="container my-5">
        <div className="card shadow p-4">
        <h3 className="text-center mb-4" style={{ color: '#0074c2' }}>Guide Details</h3>
        </div>


        <button
        type="submit"
        className="btn btn-primary btn-lg w-100 mt-3"
        style={{
          backgroundColor: '#0074c2',
          color: '#fffefe',
          padding: '15px',
          fontSize: '1.2rem',
          height: '60px',
          borderRadius: '8px'
        }}
      >
        Submit
      </button>

     </div>
    );
}