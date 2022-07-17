function cls(...classes: Array<string | boolean | undefined | null>) {
    return classes.filter(Boolean).join(' ');
}

export { cls };