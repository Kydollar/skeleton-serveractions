export async function getDelay(ms = 2000) {
    const promise = await new Promise<Boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    }).then((res) => {
        return res;
    });
    return promise;
}

export async function Await<T>({
    promise,
    children,
}: {
    promise: Promise<T>;
    children: (value: T) => JSX.Element;
}) {
    let data = await promise;

    return children(data);
}
