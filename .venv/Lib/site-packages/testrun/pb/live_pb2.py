# flake8: noqa
import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
from google.protobuf import descriptor_pb2
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='live.proto',
  package='live',
  syntax='proto2',
  serialized_pb=_b('\n\nlive.proto\x12\x04live\"\x88\x01\n\x04\x42ody\x12\n\n\x02\x62\x31\x18\x01 \x02(\x05\x12\n\n\x02\x62\x32\x18\x02 \x02(\x05\x12\n\n\x02\x62\x33\x18\x03 \x02(\x05\x12\n\n\x02\x62\x34\x18\x04 \x02(\x05\x12\n\n\x02\x62\x37\x18\x07 \x02(\t\x12\n\n\x02\x62\x38\x18\x08 \x02(\x05\x12\n\n\x02\x62\x39\x18\t \x02(\t\x12\x12\n\ntimestamp2\x18\n \x02(\x03\x12\x0b\n\x03\x62\x31\x31\x18\x0b \x02(\x05\x12\x0b\n\x03\x62\x31\x35\x18\x0f \x02(\x05\"\x19\n\x08\x43hatType\x12\r\n\x05value\x18\x01 \x02(\x05\"\x16\n\x05STR19\x12\r\n\x05value\x18\x01 \x02(\x05\"\x8a\x02\n\x12\x43ontinuationEntity\x12\x0e\n\x06header\x18\x03 \x02(\t\x12\x12\n\ntimestamp1\x18\x05 \x02(\x03\x12\n\n\x02s6\x18\x06 \x02(\x05\x12\n\n\x02s7\x18\x07 \x02(\x05\x12\n\n\x02s8\x18\x08 \x02(\x05\x12\x18\n\x04\x62ody\x18\t \x02(\x0b\x32\n.live.Body\x12\x12\n\ntimestamp3\x18\n \x02(\x03\x12\x12\n\ntimestamp4\x18\x0b \x02(\x03\x12\x0b\n\x03s13\x18\r \x02(\x05\x12 \n\x08\x63hattype\x18\x10 \x02(\x0b\x32\x0e.live.ChatType\x12\x0b\n\x03s17\x18\x11 \x02(\x05\x12\x1a\n\x05str19\x18\x13 \x02(\x0b\x32\x0b.live.STR19\x12\x12\n\ntimestamp5\x18\x14 \x02(\x03\";\n\x0c\x43ontinuation\x12+\n\x06\x65ntity\x18\xfa\xc0\x89\x39 \x02(\x0b\x32\x18.live.ContinuationEntity')
)
_sym_db.RegisterFileDescriptor(DESCRIPTOR)




_BODY = _descriptor.Descriptor(
  name='Body',
  full_name='live.Body',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='b1', full_name='live.Body.b1', index=0,
      number=1, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b2', full_name='live.Body.b2', index=1,
      number=2, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b3', full_name='live.Body.b3', index=2,
      number=3, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b4', full_name='live.Body.b4', index=3,
      number=4, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b7', full_name='live.Body.b7', index=4,
      number=7, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b8', full_name='live.Body.b8', index=5,
      number=8, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b9', full_name='live.Body.b9', index=6,
      number=9, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='timestamp2', full_name='live.Body.timestamp2', index=7,
      number=10, type=3, cpp_type=2, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b11', full_name='live.Body.b11', index=8,
      number=11, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='b15', full_name='live.Body.b15', index=9,
      number=15, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=21,
  serialized_end=157,
)


_CHATTYPE = _descriptor.Descriptor(
  name='ChatType',
  full_name='live.ChatType',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='live.ChatType.value', index=0,
      number=1, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=159,
  serialized_end=184,
)


_STR19 = _descriptor.Descriptor(
  name='STR19',
  full_name='live.STR19',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='value', full_name='live.STR19.value', index=0,
      number=1, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=186,
  serialized_end=208,
)


_CONTINUATIONENTITY = _descriptor.Descriptor(
  name='ContinuationEntity',
  full_name='live.ContinuationEntity',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='header', full_name='live.ContinuationEntity.header', index=0,
      number=3, type=9, cpp_type=9, label=2,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='timestamp1', full_name='live.ContinuationEntity.timestamp1', index=1,
      number=5, type=3, cpp_type=2, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s6', full_name='live.ContinuationEntity.s6', index=2,
      number=6, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s7', full_name='live.ContinuationEntity.s7', index=3,
      number=7, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s8', full_name='live.ContinuationEntity.s8', index=4,
      number=8, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='body', full_name='live.ContinuationEntity.body', index=5,
      number=9, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='timestamp3', full_name='live.ContinuationEntity.timestamp3', index=6,
      number=10, type=3, cpp_type=2, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='timestamp4', full_name='live.ContinuationEntity.timestamp4', index=7,
      number=11, type=3, cpp_type=2, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s13', full_name='live.ContinuationEntity.s13', index=8,
      number=13, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='chattype', full_name='live.ContinuationEntity.chattype', index=9,
      number=16, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='s17', full_name='live.ContinuationEntity.s17', index=10,
      number=17, type=5, cpp_type=1, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='str19', full_name='live.ContinuationEntity.str19', index=11,
      number=19, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
    _descriptor.FieldDescriptor(
      name='timestamp5', full_name='live.ContinuationEntity.timestamp5', index=12,
      number=20, type=3, cpp_type=2, label=2,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=211,
  serialized_end=477,
)


_CONTINUATION = _descriptor.Descriptor(
  name='Continuation',
  full_name='live.Continuation',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='entity', full_name='live.Continuation.entity', index=0,
      number=119693434, type=11, cpp_type=10, label=2,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      options=None),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  options=None,
  is_extendable=False,
  syntax='proto2',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=479,
  serialized_end=538,
)

_CONTINUATIONENTITY.fields_by_name['body'].message_type = _BODY
_CONTINUATIONENTITY.fields_by_name['chattype'].message_type = _CHATTYPE
_CONTINUATIONENTITY.fields_by_name['str19'].message_type = _STR19
_CONTINUATION.fields_by_name['entity'].message_type = _CONTINUATIONENTITY
DESCRIPTOR.message_types_by_name['Body'] = _BODY
DESCRIPTOR.message_types_by_name['ChatType'] = _CHATTYPE
DESCRIPTOR.message_types_by_name['STR19'] = _STR19
DESCRIPTOR.message_types_by_name['ContinuationEntity'] = _CONTINUATIONENTITY
DESCRIPTOR.message_types_by_name['Continuation'] = _CONTINUATION

Body = _reflection.GeneratedProtocolMessageType('Body', (_message.Message,), dict(
  DESCRIPTOR = _BODY,
  __module__ = 'live_pb2'
  # @@protoc_insertion_point(class_scope:live.Body)
  ))
_sym_db.RegisterMessage(Body)

ChatType = _reflection.GeneratedProtocolMessageType('ChatType', (_message.Message,), dict(
  DESCRIPTOR = _CHATTYPE,
  __module__ = 'live_pb2'
  # @@protoc_insertion_point(class_scope:live.ChatType)
  ))
_sym_db.RegisterMessage(ChatType)

STR19 = _reflection.GeneratedProtocolMessageType('STR19', (_message.Message,), dict(
  DESCRIPTOR = _STR19,
  __module__ = 'live_pb2'
  # @@protoc_insertion_point(class_scope:live.STR19)
  ))
_sym_db.RegisterMessage(STR19)

ContinuationEntity = _reflection.GeneratedProtocolMessageType('ContinuationEntity', (_message.Message,), dict(
  DESCRIPTOR = _CONTINUATIONENTITY,
  __module__ = 'live_pb2'
  # @@protoc_insertion_point(class_scope:live.ContinuationEntity)
  ))
_sym_db.RegisterMessage(ContinuationEntity)

Continuation = _reflection.GeneratedProtocolMessageType('Continuation', (_message.Message,), dict(
  DESCRIPTOR = _CONTINUATION,
  __module__ = 'live_pb2'
  # @@protoc_insertion_point(class_scope:live.Continuation)
  ))
_sym_db.RegisterMessage(Continuation)


# @@protoc_insertion_point(module_scope)
