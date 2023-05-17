'use client';

function logout() {
    function exit() {
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <div>
        {
            exit()
        }
        </div>
    )
}
export default logout;