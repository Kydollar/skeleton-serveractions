export const getDelay = async (ms = 2000) => {
    const promise = await new Promise<Boolean>((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    }).then((res) => {
        return res;
    });
    return promise;
};

export default async function Await<T>({
    promise,
    children,
}: {
    promise: Promise<T>;
    children: (value: T) => JSX.Element;
}) {
    let data = await promise;

    return children(data);
}
