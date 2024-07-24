import argparse

def append_to_markdown(filename, content):
  """
  Appends content to a markdown file.

  Args:
    filename: The path to the markdown file.
    content: The string content to append.
  """
  with open(filename, 'a') as f:
    f.write(content + '\n')

def main():
  parser = argparse.ArgumentParser(description="Append text to a markdown file")
  parser.add_argument("filename", help="Path to the markdown file")
  parser.add_argument("-b", "--bullet", help="Text to append as a bulleted list item")
  parser.add_argument("-c", "--code", help="Text to append as a code block")
  args = parser.parse_args()

  content_to_append = ""
  if args.bullet:
    content_to_append += f"- {args.bullet}\n"
  if args.code:
    content_to_append += "\n```\n" + args.code + "\n```\n"

  if content_to_append:
    append_to_markdown(args.filename, content_to_append)
    print(f"Content appended to {args.filename}")
  else:
    print("No content provided to append. Use -b or -c flags with text.")

if __name__ == "__main__":
  main()
