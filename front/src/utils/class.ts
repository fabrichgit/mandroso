export function reactiveClass(identifiant: string | number, case_: string | number, class_: string | string[], elseClass_: string | string[]) {
    return identifiant === case_ ? (typeof (class_) === "string" ? class_ : class_.join(' ')) : (typeof (elseClass_) === "string" ? elseClass_ : elseClass_.join(' '))
}

export function reactiveClassV2(condition: Boolean, class_: string | string[], elseClass_: string | string[]) {
    return condition ? (typeof (class_) === "string" ? class_ : class_.join(' ')) : (typeof (elseClass_) === "string" ? elseClass_ : elseClass_.join(' '))
}