import InvariantError from './InvariantError';

type Directories = {
    [key: string]: InvariantError;
};

type DomainErrorTranslatorType = {
    translate: (error: Error) => InvariantError | Error;
    _directories: Directories;
};

const DomainErrorTranslator: DomainErrorTranslatorType = {
    translate(error: Error) {
        return (
            DomainErrorTranslator._directories[error.message] || error
        );
    },
    _directories: {
        'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY':
            new InvariantError(
                'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada',
            ),
        'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION':
            new InvariantError(
                'tidak dapat membuat user baru karena tipe data tidak sesuai',
            ),
        'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
            'tidak dapat membuat user baru karena karakter username melebihi batas limit',
        ),
        'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER':
            new InvariantError(
                'tidak dapat membuat user baru karena username mengandung karakter terlarang',
            ),
    },
};

export default DomainErrorTranslator;
